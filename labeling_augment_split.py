
import os
import cv2
import random
import albumentations as A

# Lokasi folder dataset Anda
base_dir = "Dataset"
output_base = "output_dataset"
classes = ['plastic_bottle', 'glass_bottle', 'can', 'other']

# Membuat struktur output
for split in ['train', 'val', 'test']:
    for sub in ['images', 'labels']:
        os.makedirs(os.path.join(output_base, split, sub), exist_ok=True)

# Augmentasi (hanya untuk train)
augment = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.3),
    A.Rotate(limit=15, p=0.3),
], bbox_params=A.BboxParams(format='yolo', label_fields=['class_labels']))

# Konversi bbox ke format YOLO
def convert_to_yolo(x, y, w, h, img_w, img_h):
    x_center = (x + w / 2) / img_w
    y_center = (y + h / 2) / img_h
    w /= img_w
    h /= img_h
    return x_center, y_center, w, h

for class_id, class_name in enumerate(classes):
    class_dir = os.path.join(base_dir, class_name)
    all_files = [f for f in os.listdir(class_dir) if f.lower().endswith(".jpg")]
    random.shuffle(all_files)

    n_total = len(all_files)
    n_train = int(0.8 * n_total)
    n_val = int(0.1 * n_total)
    splits = {
        'train': all_files[:n_train],
        'val': all_files[n_train:n_train + n_val],
        'test': all_files[n_train + n_val:]
    }

    for split, files in splits.items():
        for fname in files:
            img_path = os.path.join(class_dir, fname)
            img = cv2.imread(img_path)
            h, w = img.shape[:2]

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            if not contours:
                continue

            x, y, bw, bh = cv2.boundingRect(max(contours, key=cv2.contourArea))
            bbox = convert_to_yolo(x, y, bw, bh, w, h)

            out_img_path = os.path.join(output_base, split, 'images', fname)
            out_label_path = os.path.join(output_base, split, 'labels', fname.rsplit('.', 1)[0] + '.txt')
            cv2.imwrite(out_img_path, img)
            with open(out_label_path, 'w') as f:
                f.write(f"{class_id} {' '.join([f'{b:.6f}' for b in bbox])}\n")

            if split == 'train':
                aug_result = augment(image=img, bboxes=[bbox], class_labels=[class_id])
                aug_img = aug_result['image']
                aug_bbox = aug_result['bboxes'][0]
                aug_img_name = f"aug_{fname}"
                aug_label_name = f"aug_{fname.rsplit('.', 1)[0]}.txt"

                aug_img_path = os.path.join(output_base, split, 'images', aug_img_name)
                aug_label_path = os.path.join(output_base, split, 'labels', aug_label_name)
                cv2.imwrite(aug_img_path, aug_img)
                with open(aug_label_path, 'w') as f:
                    f.write(f"{class_id} {' '.join([f'{b:.6f}' for b in aug_bbox])}\n")
