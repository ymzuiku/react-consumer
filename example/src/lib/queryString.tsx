export const queryString = {
  parse: (str: string): { [key: string]: string } => {
    const obj: { [key: string]: any } = {};
    const seg = str.replace(/^\?/, '').split('&');

    // tslint:disable-next-line
    for (let i = 0; i < seg.length; i++) {
      if (!seg[i]) {
        continue;
      }
      const t = seg[i].split('=');
      if (t[1].indexOf(',') > -1) {
        obj[t[0]] = t[1].split(',');
      } else {
        obj[t[0]] = t[1];
      }
    }

    return obj;
  },
  stringify: (obj: { [key: string]: any }): string => {
    let str = '';
    let isFirst = true;
    // tslint:disable-next-line
    for (const k in obj) {
      let v = obj[k];
      if (Object.prototype.toString.call(obj[k]) === '[object Array]') {
        v = obj[k].join(',');
      }
      if (isFirst) {
        isFirst = false;
        str += `${k}=${v}`;
      } else {
        str += `&${k}=${v}`;
      }
    }

    return str;
  },
};
