const navItems = document.querySelectorAll(".side-nav-item");

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', () => {
        for (let j = 0; j < navItems.length; j++) {
            navItems[j].classList.remove('bg-success');
        }
        navItems[i].classList.add('bg-success');
    })
}