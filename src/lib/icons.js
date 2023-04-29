const urls = import.meta.glob("$lib/assets/icons/**/*.svg", { as: 'url', eager: true})
const icons = Object.values(urls)

const iconLookup = {}

icons.forEach((icon) => {
    let key = icon
    .replace(/^.*[\\\/]/, '')
    .replace(/\.[^/.]+$/, '')
    iconLookup[key] = icon
})

export default iconLookup;
