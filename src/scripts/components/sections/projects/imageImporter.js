import ProjectsData from './projectsData.json';

let images = {};

export async function returnImages(which, type) {
    if (Object.keys(images).length < 1) {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(ProjectsData)) {
            let thumbnail;

            try {
                thumbnail = await import(`../../../../images/projects/${key}/thumbnail.png`);
            } catch(error) {
                // Nothing
            };

            if (!thumbnail) {
                try {
                    thumbnail = await import(`../../../../images/projects/${key}/thumbnail.svg`);
                } catch(error) {
                    // Nothing
                };
            };

            images[key] = {};
            images[key]['thumbnail'] = thumbnail?.default;
        };
    };
    
    if (images?.[which.toString()]?.[type.toString()]) {
        return images[which.toString()][type.toString()];
    };
};