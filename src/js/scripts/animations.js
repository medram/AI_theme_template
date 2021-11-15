import Config from '../configs'

(() => {
    // for particles effect
    if (Config.particles) {
        particlesJS.load('particles-js', 'assets/js/particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }
    // for particles effect
    if (Config.page_header_particles) {
        particlesJS.load('header-particles', 'assets/js/headers_particles.json', function () {
            console.log('callback - particles.js config loaded');
        });
    }

    // dispatch animation while scroling
    let section = document.getElementById('first-section')
    let section2 = document.getElementById('secound-section')
    let section3 = document.getElementById('stats')
    let section4 = document.getElementById('companies-section')
    let section5 = document.getElementById('steps-container')

    // list all sections to be registered later
    const sections = [
        section,
        section2,
        section3,
        section4,
        section5,
    ]

    //console.log(section)
    let observer = new IntersectionObserver((entries) => {
        //console.log(entries)
        entries.forEach(entry => {
            let target = entry.target

            if (entry.isIntersecting) {
                let id = target.getAttribute('id')

                switch (id) {
                    case section.getAttribute('id'):
                        target.classList.add("animate__fadeInLeft")
                        break
                    case section2.getAttribute('id'):
                        target.classList.add("animate__fadeInRight")
                        break
                    case section3.getAttribute('id'):
                        target.classList.add("animate__fadeIn")
                        break
                    case section4.getAttribute('id'):
                        target.classList.add("animate__fadeInLeft")
                        break
                    case section5.getAttribute('id'):
                        target.classList.add("animate__fadeInUp")
                        break
                }
            }
        })
    })

    // register all sections
    sections.forEach(section => {
        observer.observe(section)
    })
})()
