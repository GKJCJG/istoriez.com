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
        message: 'iStoriez is using cookies.',
        dismiss: 'Ok',
        link: 'Read more',
        href: '/privacy-policy/'
    }
};

window.addEventListener('load', () => {
    window.cookieconsent.initialise(options);
});