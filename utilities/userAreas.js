import areas from '../data/areas.json';

const defaultAreas = [ 'Lewisham', 'Solihull', 'South Cambridgeshire', 'Dorset'];

export function SetFavouriteAreas(areas) {
    localStorage.setItem('favouriteAreas', JSON.stringify(areas));
}

export function GetFavouriteAreas() {
    let favouriteAreas = JSON.parse(localStorage.getItem('favouriteAreas'));

    if(!favouriteAreas || favouriteAreas.length == 0) {
        SetFavouriteAreas(defaultAreas);
        favouriteAreas = defaultAreas;
    }
    
    return favouriteAreas
        .map(area => areas.find(a => a.Name === area))
        .filter(area => !!area);
}

export function GetAllAreas() {
    return areas;
}