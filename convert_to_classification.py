import os
import shutil

# Pemetaan class_id ke nama kelas
class_map = {
    '0': 'plastic_bottle',
    '1': 'glass_bottle',
    '2': 'can',
    '3': 'other'
}

# Lokasi input/output
input_base = "output_dataset"
output_base = "mobilenet_dataset"

# Buat struktur klasifikasi
for split in ['train', 'val', 'test']:
    for class_name in class_map.values():
        os.makedirs(os.path.join(output_base, split, class_name), exist_ok=True)

# Proses file .txt untuk setiap split
for split in ['train', 'val', 'test']:
    label_dir = os.path.join(input_base, split, 'labels')
    image_dir = os.path.join(input_base, split, 'images')

    for label_file in os.listdir(label_dir):
        if not label_file.endswith('.txt'):
            continue

        label_path = os.path.join(label_dir, label_file)
        with open(label_path, 'r') as f:
            first_line = f.readline().strip()

        if first_line == "":
            continue

        class_id = first_line.split()[0]
        class_name = class_map.get(class_id)
        image_name = label_file.replace(".txt", ".jpg")
        image_path = os.path.join(image_dir, image_name)

        if os.path.exists(image_path):
            dest_path = os.path.join(output_base, split, class_name, image_name)
            shutil.copy(image_path, dest_path)
