export default {
  convertDateStrToUTCDateStr: (strDate: string): string => {
    return new Date(strDate).toUTCString();
  },
};
