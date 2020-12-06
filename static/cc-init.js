const options = {
    palette: {
        popup: {
            background: '#252e39'
        },
        button: {
            background: '#14a7d0'
        }
    },
    position: "top",
    static: true,
    content: {
        message: 'iStoriez använder cookies.',
        dismiss: 'Ok',
        link: 'Läs mer',
        href: '/integritetspolicy/'
    }
};

window.addEventListener('load', () => {
    window.cookieconsent.initialise(options);
});