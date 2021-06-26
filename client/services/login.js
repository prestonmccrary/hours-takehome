export const login = (name) => {

    localStorage.setItem('name', name)

}

export const isLoggedIn = () => {
    try{
        return !!(localStorage?.getItem('name'))

    } catch (err) {
        return false;
    }
    
}

export const getName = () => {

    if(!isLoggedIn){
        return null
    }

    return localStorage.getItem('name')
    
}