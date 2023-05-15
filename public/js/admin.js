const dashboardContainer = document.getElementById('dashboard-container');

const togglePage = document.querySelectorAll('.toggle_page');

const showPage = (currentpage) => {
    const activeLink = document.getElementById(currentpage);
    activeLink.classList.add('.active');
}


for (let i = 0; i < togglePage.length; i++) {
    togglePage[i].addEventListener('click', (e) => {
        if(togglePage[i].getAttribute("id")  === "request") {

        }
        
    })
}



