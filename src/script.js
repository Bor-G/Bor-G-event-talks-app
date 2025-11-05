document.addEventListener('DOMContentLoaded', () => {
    const scheduleElement = document.getElementById('schedule');
    const searchInputElement = document.getElementById('searchInput');

    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0);

    const renderSchedule = (filter = '') => {
        scheduleElement.innerHTML = '';
        let currentTime = new Date(startTime);

        talks.forEach(talk => {
            const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60000);

            if (filter === '' || talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))) {
                const talkElement = document.createElement('div');
                talkElement.classList.add('talk');

                if (talk.title === 'Lunch Break') {
                    talkElement.classList.add('lunch-break');
                }

                const timeString = `${currentTime.toTimeString().substring(0, 5)} - ${talkEndTime.toTimeString().substring(0, 5)}`;

                let speakersHtml = '';
                if (talk.speakers.length > 0) {
                    speakersHtml = `<div class="talk-speakers">By: ${talk.speakers.join(', ')}</div>`;
                }

                let categoryHtml = '';
                if (talk.category.length > 0) {
                    categoryHtml = `<div class="talk-category">${talk.category.map(cat => `<span>${cat}</span>`).join('')}</div>`;
                }

                talkElement.innerHTML = `
                    <div class="talk-time">${timeString}</div>
                    <div class="talk-title">${talk.title}</div>
                    ${speakersHtml}
                    ${categoryHtml}
                    <div class="talk-description">${talk.description}</div>
                `;
                scheduleElement.appendChild(talkElement);
            }

            currentTime = new Date(talkEndTime.getTime() + 10 * 60000); // 10 minute break
        });
    };

    searchInputElement.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule();
});