// Initial files
let files = [
    {
        name: "Cloud_Project.pdf",
        type: "PDF",
        size: "2.4 MB",
        date: "07 Oct 2026"
    },
    {
        name: "Presentation.pptx",
        type: "PowerPoint",
        size: "5.8 MB",
        date: "06 Oct 2026"
    },
    {
        name: "Database.sql",
        type: "SQL File",
        size: "12.5 MB",
        date: "05 Oct 2026"
    },
    {
        name: "Website.zip",
        type: "ZIP",
        size: "24.2 MB",
        date: "03 Oct 2026"
    }
];


// Display files
function displayFiles(fileList = files) {

    const table = document.getElementById("fileTable");
    const emptyMessage = document.getElementById("emptyMessage");

    table.innerHTML = "";

    if (fileList.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    fileList.forEach((file, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="file-name">📄 ${file.name}</td>
            <td>${file.type}</td>
            <td>${file.size}</td>
            <td>${file.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteFile(${index})">
                    🗑 Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });

    updateFileCount();
}


// Delete file
function deleteFile(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this file?"
    );

    if (confirmDelete) {
        files.splice(index, 1);
        displayFiles();
        updateStorage();
    }
}


// File upload
document.getElementById("fileInput").addEventListener("change", function(event) {

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
        return;
    }

    const fileSizeMB = selectedFile.size / (1024 * 1024);

    const file = {
        name: selectedFile.name,
        type: getFileType(selectedFile.name),
        size: fileSizeMB.toFixed(2) + " MB",
        date: getCurrentDate()
    };

    files.push(file);

    displayFiles();
    updateStorage();

    alert(
        selectedFile.name +
        " has been uploaded successfully!"
    );

    event.target.value = "";
});


// Get file type
function getFileType(fileName) {

    const extension = fileName
        .split(".")
        .pop()
        .toLowerCase();

    const types = {
        pdf: "PDF",
        doc: "Word",
        docx: "Word",
        ppt: "PowerPoint",
        pptx: "PowerPoint",
        xls: "Excel",
        xlsx: "Excel",
        jpg: "Image",
        jpeg: "Image",
        png: "Image",
        gif: "Image",
        mp4: "Video",
        mp3: "Audio",
        zip: "ZIP",
        rar: "RAR",
        js: "JavaScript",
        html: "HTML",
        css: "CSS",
        sql: "SQL File",
        txt: "Text"
    };

    return types[extension] || "File";
}


// Current date
function getCurrentDate() {

    const date = new Date();

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// Search
document.getElementById("searchInput").addEventListener("input", function() {

    const searchText = this.value.toLowerCase();

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchText) ||
        file.type.toLowerCase().includes(searchText)
    );

    displayFiles(filteredFiles);
});


// Update file count
function updateFileCount() {

    document.getElementById("fileCount").textContent =
        files.length;
}


// Update storage
function updateStorage() {

    let totalMB = 0;

    files.forEach(file => {

        const number = parseFloat(file.size);

        if (!isNaN(number)) {
            totalMB += number;
        }
    });

    // Base cloud usage + uploaded files
    const baseStorage = 2400;
    const usedMB = baseStorage + totalMB;

    const usedGB = usedMB / 1024;

    const percentage = Math.min(
        (usedGB / 10) * 100,
        100
    );

    document.getElementById("usedStorage").textContent =
        usedGB.toFixed(2);

    document.getElementById("storagePercent").textContent =
        Math.round(percentage) + "%";

    document.getElementById("progressBar").style.width =
        percentage + "%";
}


// Dark mode
document.getElementById("themeBtn").addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        this.textContent = "☀️ Light Mode";
    } else {
        this.textContent = "🌙 Dark Mode";
    }
});


// Initial display
displayFiles();
updateStorage();
