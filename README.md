# UBC-Bunnies

**UBC-Bunnies** is a mental health and peer-support web app built at **HackCamp 2024** to help UBC students find connection, support, and understanding through shared experiences.

Video demo: https://devpost.com/software/bunnies

**UBC-Bunnies** was a **finalist** for **HackCamp 2024**, hosted by **nwPlus**.


## Inspiration

We were inspired by the HackCamp theme and a common challenge faced by many UBC students: struggling with mental health, making friends, and managing stress. We wanted to create a warm, approachable platform where students could feel less alone by connecting with others who are going through similar experiences.

## What It Does

UBC-Bunnies allows users to:

- Create a personal profile with personality traits, interests, living situations, and support goals  
- Get matched with other students through a swipe-style matchmaking experience based on shared traits and goals
- Journal privately to reflect on thoughts and moods  
- Browse mental health resources and external support organizations  
- Send messages in a simple chat interface  

The app focuses on **connection, reflection, and support**.

## How We Built It

UBC-Bunnies was built with:
- **HTML** for structure  
- **CSS** for styling  
- **Vanilla JavaScript** for logic and interactivity  

We used **browser localStorage** to persist user data such as:
- Profile information (name, traits, preferences)
- Journal entries
- Match-related state

This allowed us to simulate a real, multi-page experience without needing a backend server.

## Login & Authentication

Due to time constraints and the scope of the hackathon, the login system is **intentionally hardcoded**.  
Any credentials entered will proceed into the app.

Authentication and security were not the focus of this project — the focus was on user experience, interaction design, and front-end logic.

## Future Improvements

- Add an AI-powered mental health support chatbot  
- Replace localStorage with a real backend and database  
- Implement proper authentication and privacy controls  
- Improve matchmaking with smarter compatibility scoring
