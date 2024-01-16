// Function to calculate relative time
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000; // years

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000; // months
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400; // days
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600; // hours
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60; // minutes
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

document.addEventListener("DOMContentLoaded", function() {
    var exactDate = document.getElementById("exactDate");
    var dynamicLastUpdated = document.getElementById("dynamicLastUpdated");
    var lastUpdatedDate = new Date(document.lastModified);

    dynamicLastUpdated.textContent = 'Updated ' + timeSince(lastUpdatedDate);
    exactDate.textContent = lastUpdatedDate.toLocaleDateString();

    let hoverTimer;
    var navbarDateElement = document.querySelector('.nav-lastupdated');

    navbarDateElement.addEventListener('mouseover', function() {
        hoverTimer = setTimeout(function() {
            exactDate.style.visibility = 'visible';
        }, 1000); // 1-second delay
    });

    navbarDateElement.addEventListener('mouseout', function() {
        clearTimeout(hoverTimer);
        exactDate.style.visibility = 'hidden';
    });
});


document.querySelectorAll('.dropdown-button').forEach(button => {
    button.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        const arrow = this.querySelector('.arrow-down');

        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        arrow.classList.toggle('arrow-up', dropdownContent.style.display === "block");
    });
});

// Script for Tab Switching and Management
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.onclick = function() {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active');
            });

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            var contentId = 'content-' + this.id;
            var activeContent = document.getElementById(contentId);
            activeContent.style.display = 'grid';
            activeContent.classList.add('active');
        };
    });

    // Set the default active tab and content on initial load
    const defaultActiveTab = document.querySelector('.tab.active');
    if (defaultActiveTab) {
        var contentId = 'content-' + defaultActiveTab.id;
        var activeContent = document.getElementById(contentId);
        activeContent.style.display = 'grid';
        activeContent.classList.add('active');
    }
});
