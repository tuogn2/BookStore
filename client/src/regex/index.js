export const cookie = (user) => {
    let patms = /^user.*$/;
    if (patms.test(user)) {
        return true;
    }
    return false;
}

export const regexpass = (pass) => {
    let patms = /^.{8,}$/;
    if (patms.test(pass)) {
        return true;
    }
    return false;

}

// export  const regexSearch = (txt) => {
//     let patms = /^.{0,}${txt}$/;
//     if (patms.test(pass)) {
//         return true;
//     }
//     return false;

// }

export const regexSearch = (txt, name) => {
    const pattern = new RegExp(`^.*${txt}.*$`, 'i');
    return pattern.test(name);
  };



export const regexuser = (user) => {
    let patms = /^.{10,}$/;
    if (patms.test(user)) {
        return true;
    }
    return false;

}