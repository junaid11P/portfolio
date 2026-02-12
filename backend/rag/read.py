import os
import pypdfium2 as pdfium

# Get the directory of the current script
base_dir = os.path.dirname(os.path.abspath(__file__))
resume_pdf_path = os.path.join(base_dir, "JunedResume.pdf")

def get_text():
    if os.path.exists(resume_pdf_path):
        try:
            pdf = pdfium.PdfDocument(resume_pdf_path)
            text = ""
            for page in pdf:
                text += page.get_textpage().get_text_range()
            return text
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return ""
    else:
        print(f"Warning: {resume_pdf_path} not found.")
        return ""

text = get_text()

if __name__ == "__main__":
    print("--- File Read Check ---")
    if text:
        print(f"Total characters read: {len(text)}")
        print(f"First 100 chars: {text[:100]}...")
    else:
        print("No text found.")