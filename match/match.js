let currentIndex = 0;

generateFakeUsers();

const getCurrentUserTraits = () => {
    return {
        name: localStorage.getItem("name") || "Judy Hopps",
        personality: JSON.parse(localStorage.getItem("personalitytraits")) || ["Introverted"],
        activities: JSON.parse(localStorage.getItem("activitiestraits")) || ["Soccer"],
        living: JSON.parse(localStorage.getItem("livingtraits")) || ["Commuter"],
        support: JSON.parse(localStorage.getItem("supporttraits")) || ["Make Friends"]
    };
};


const populateTags = (traitsObject, sectionId) => {
    const section = document.querySelector(`#${sectionId} .attributes`);
    if (!section) {
        console.error(`Section with ID ${sectionId} or its .attributes child not found.`);
        return;
    }

    section.innerHTML = "";
    
    for (const [traitType, traits] of Object.entries(traitsObject)) {
        if (traits.length > 0) {
            const heading = document.createElement("p");
            heading.textContent = traitType;
            heading.style.fontWeight = "bold";
            heading.style.marginBottom = "5px";
            section.appendChild(heading);

            traits.forEach(trait => {
                const tag = document.createElement("span");
                tag.classList.add("tag");
                tag.textContent = trait;
                section.appendChild(tag);
            });

            const spacing = document.createElement("div");
            spacing.style.marginBottom = "15px";
            section.appendChild(spacing);
        }
    }
};

// Update `populateProfile` to pass traits as an object
const populateProfile = (user) => {
    const currentProfile = document.getElementById("current-profile");
    const profileImg = currentProfile.querySelector("img");
    const profileName = currentProfile.querySelector("h3");
    const profileBio = currentProfile.querySelector("p");

    profileImg.src = user.getImage();
    profileImg.alt = user.getName();
    profileName.textContent = user.getName();
    profileBio.textContent = user.getBio();

    const currentUserTraits = getCurrentUserTraits();

    // Calculate similarities and differences
    const similarities = {
        Activities: currentUserTraits.activities.filter(trait =>
            user.getActivities().split(", ").includes(trait)
        ),
        Personality: currentUserTraits.personality.filter(trait =>
            user.getPersonality().split(", ").includes(trait)
        ),
        "Living Situation": currentUserTraits.living.filter(trait =>
            user.getLiving().includes(trait)
        ),
        "Support Goals": currentUserTraits.support.filter(trait =>
            user.getGoals().split(", ").includes(trait)
        )
    };

    const differences = {
        Activities: user.getActivities().split(", ").filter(trait =>
            !currentUserTraits.activities.includes(trait)
        ),
        Personality: user.getPersonality().split(", ").filter(trait =>
            !currentUserTraits.personality.includes(trait)
        ),
        "Living Situation": [user.getLiving()].filter(trait =>
            !currentUserTraits.living.includes(trait)
        ),
        "Support Goals": user.getGoals().split(", ").filter(trait =>
            !currentUserTraits.support.includes(trait)
        )
    };

    populateTags(similarities, "similarities-section");
    populateTags(differences, "differences-section");
};

function swipeProfile(action) {
    console.log('swipe called');
    const currentProfile = document.getElementById("current-profile");
    const differencesSection = document.querySelector(".differences-section");
    const similaritiesSection = document.querySelector(".similarities-section");

    if (action === "reject") {
        currentProfile.classList.add("outgoing");
        differencesSection.classList.add("active");
        similaritiesSection.classList.remove("active");
    } else if (action === "accept") {
        currentProfile.classList.add("outgoing");
        similaritiesSection.classList.add("active");
        differencesSection.classList.remove("active");
    }

    // Wait for the animation to complete before updating the profile
    setTimeout(() => {
        currentProfile.remove();

        const profileContainer = document.getElementById("profile-container");
        const newProfile = document.createElement("div");
        newProfile.id = "current-profile";
        newProfile.className = "profile-section incoming";

        const imgElement = document.createElement("img");
        const nameElement = document.createElement("h3");
        const bioElement = document.createElement("p");

        newProfile.append(imgElement, nameElement, bioElement);
        profileContainer.insertBefore(newProfile, similaritiesSection);

        currentIndex = (currentIndex + 1) % allUsers.length;
        populateProfile(allUsers[currentIndex]);

        setTimeout(() => {
            newProfile.classList.remove("incoming");
        }, 10);

        differencesSection.classList.remove("active");
        similaritiesSection.classList.remove("active");
    }, 500);
}

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const firstUser = allUsers[currentIndex];
    populateProfile(firstUser);

    const rejectBtn = document.getElementById("reject-btn");
    const acceptBtn = document.getElementById("accept-btn");

    if (rejectBtn && acceptBtn) {
        rejectBtn.addEventListener("click", () => swipeProfile("reject"));
        acceptBtn.addEventListener("click", () => swipeProfile("accept"));
    } else {
        console.error("Reject or Accept button not found in the DOM.");
    }
});

