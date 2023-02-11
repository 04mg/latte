const imageProvider = 'https://source.unsplash.com/random/<size>/?<searchTerm>';

export const searchImage = async (searchTerm) => {
    const url = imageProvider
        .replace('<size>', `${window.screen.width}x${window.screen.size}`)
        .replace('<searchTerm>', searchTerm);
    return (await fetch(url)).url;
};
