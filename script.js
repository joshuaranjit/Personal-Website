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


// Script for Skills Tab Switching and Management
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skills-tab').forEach(tab => {
        tab.onclick = function() {
            // Remove active class from all skill tabs and contents
            document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active');
            });

            // Add active class to clicked skill tab and corresponding content
            this.classList.add('active');
            var contentId = 'content-' + this.id;
            var activeContent = document.getElementById(contentId);
            activeContent.style.display = 'grid';
            activeContent.classList.add('active');
        };
    });

    // Set the default active skill tab and content on initial load
    const defaultActiveTab = document.querySelector('.skills-tab.active');
    if (defaultActiveTab) {
        var contentId = 'content-' + defaultActiveTab.id;
        var activeContent = document.getElementById(contentId);
        activeContent.style.display = 'grid';
        activeContent.classList.add('active');
    }
});


function filterArticles(sectionId, tag) {
    // Convert the tag to lowercase to match the data-tags attribute values
    const filterTag = tag.toLowerCase();

    // Get all article items within a specific section
    const articles = document.querySelectorAll(`#${sectionId} .article-item`);

    // Loop through all articles and toggle their display based on the data-tags attribute
    articles.forEach(article => {
        // Make sure the article has the data-tags attribute
        const articleTags = article.getAttribute('data-tags').toLowerCase();
        if (filterTag === 'all' || articleTags.includes(filterTag)) {
            article.style.display = 'flex'; // Change display to 'flex' or 'block' as per your layout
        } else {
            article.style.display = 'none';
        }
    });

    // Update the active state for article tabs within the specified section
    const tabs = document.querySelectorAll(`#${sectionId} .articles-tab`);
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-filter') === tag) {
            tab.classList.add('active');
        }
    });
}

// Event listener to initialize the filter to 'all' on page load
document.addEventListener('DOMContentLoaded', () => filterArticles('articles', 'all'));

// JavaScript function to switch tabs and show the related content - Professional Development

document.addEventListener('DOMContentLoaded', function() {
    // Function to switch tabs
    function switchTab(tab) {
        // Remove active class from all tabs
        document.querySelectorAll('.professional-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
    
        // Hide all tab contents
        document.querySelectorAll('.tab-content-professional').forEach(c => c.style.display = 'none');
        
        // Show the content that matches the clicked tab's filter
        const filter = tab.getAttribute('data-filter');
        const targetContent = document.querySelector(`.tab-content-professional[data-category="${filter}"]`);
    
        // Check if the screen width is 768px or less
        if (window.innerWidth <= 768) {
            // It's a mobile screen, set display to flex
            targetContent.style.display = 'flex';
        } else {
            // It's a non-mobile screen, set display to block
            targetContent.style.display = 'block';
        }
    }

    // Add click event listeners to tabs
    document.querySelectorAll('.professional-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this);
        });
    });

    // Initialize the default active tab
    const defaultActiveTab = document.querySelector('.professional-tab.active');
    if (defaultActiveTab) {
        switchTab(defaultActiveTab);
    }

    window.addEventListener('resize', function() {
        const activeTab = document.querySelector('.professional-tab.active');
        if (activeTab) {
            switchTab(activeTab);
        }
    })
});

// adding confetti effects to download CV
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadCV').addEventListener('click', function() {
        // Delay the confetti animation by 1.5 seconds
        setTimeout(function() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 1000); // 1500 milliseconds = 1.5 seconds
    });
});

// Amplitude tracking for project card clicks
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card, index) {
        card.addEventListener('click', function() {
            // Assuming amplitude.track is available for use directly
            const projectName = this.querySelector('h3') ? this.querySelector('h3').innerText : `Project ${index + 1}`;
            amplitude.track('Project Card Clicked', { projectName: projectName });
        });
    });
});

// amplitude tracking for article clicks
document.querySelectorAll('.article-item').forEach(function(article) {
    article.addEventListener('click', function() {
        // Use the article title or some unique identifier as part of the event properties
        var articleTitle = this.querySelector('.article-title').innerText;
        amplitude.track('Article Opened', { title: articleTitle });
    });
});


