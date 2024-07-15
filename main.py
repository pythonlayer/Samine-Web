import re
import pyperclip

def transform_to_download_link(drive_link):
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', drive_link)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/uc?export=download&id={file_id}"
    return None

def transform_to_image_link(drive_link):
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', drive_link)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/thumbnail?id={file_id}"
    return None

def create_custom_level_div(img_src, download_link, creator_name, level_name, mode_name):
    div = f'<div class="grid-item">\n'
    div += f'    <img src="{img_src}" alt="{level_name}">\n'
    div += f'    <p>{level_name}<br><em>by {creator_name}</em></p>\n'
    div += f'    <button class="download-button" onclick="urlLevel(\'{download_link}\')">Download</button>\n'
    div += f'    <button class="info-button" onclick="showModeInfo(\'{mode_name}\')">Info</button>\n'
    div += f'</div>'
    return div


def get_user_input():
    img_src_input = input("Enter image source (Google Drive link, regular link, or file path): ")
    download_link_input = input("Enter download link (Google Drive link or regular link): ")
    creator_name = input("Enter creator's name: ")
    level_name = input("Enter level name: ")

    while True:
        mode_abbr = input("Enter mode (R for Reflourished or A for AltverZ): ").upper()
        if mode_abbr == "R":
            mode_name = "Reflourished"
            break
        elif mode_abbr == "A":
            mode_name = "AltverZ"
            break
        else:
            print("Invalid mode. Please enter 'R' for Reflourished or 'A' for AltverZ.")

    # Check if the input is a valid Google Drive link for image source
    img_src = transform_to_image_link(img_src_input)
    download_link = None

    if img_src is None:
        # Check if the input is a valid Google Drive link for download link
        download_link = transform_to_download_link(download_link_input)
        if download_link is None:
            # If neither is a Google Drive link, assume they are regular links or file paths
            img_src = img_src_input
            download_link = download_link_input
        else:
            # If the download link is a Google Drive link, use the input as image source
            img_src = img_src_input
    else:
        # If the image source is a Google Drive link, try to use the download link as Google Drive link
        download_link = transform_to_download_link(download_link_input)
        if download_link is None:
            # If the download link is not a Google Drive link, assume it's a regular link
            download_link = download_link_input

    return img_src, download_link, creator_name, level_name, mode_name

def main():
    print("Welcome to the Custom Level Div Generator!")
    print("Please provide the following information:")
    img_src, download_link, creator_name, level_name, mode_name = get_user_input()
    custom_level_div = create_custom_level_div(img_src, download_link, creator_name, level_name, mode_name)
    print("\nGenerated Custom Level Div:")
    print(custom_level_div)
    pyperclip.copy(custom_level_div)
    print("The generated HTML div has been copied to the clipboard.")


if __name__ == "__main__":
    main()
    input("Press any key to close.")
