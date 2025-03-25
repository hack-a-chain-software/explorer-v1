import { convertArrayToCSV } from 'convert-array-to-csv'

function flatObjectToString(obj) {
  var s = "";
  Object.keys(obj).map(key => {
    if (obj[key] === null) {
      s += key + ":";
    } else if (obj[key].toLocaleDateString) {
      s += key + ": " + obj[key].toLocaleDateString() + "\n";
    } else if (obj[key] instanceof Array) {
      s += key + ":\n" + listToFlatString(obj[key]);
    } else if (typeof obj[key] == "object") {
      s += key + ":\n" + flatObjectToString(obj[key]);
    } else {
      s += key + ":" + obj[key];
    }
    s += "\n";
  });
  return s;
}

function listToFlatString(list) {
  var s = "";
  list.map(item => {
    Object.keys(item).map(key => {
      s += "";
      if (item[key] instanceof Array) {
        s += key + "\n" + listToFlatString(item[key]);
      } else if (typeof item[key] == "object" && item[key] !== null) {
        s += key + ": " + flatObjectToString(item[key]);
      } else {
        s += key + ": " + (item[key] === null ? "" : item[key].toLocaleDateString ? item[key].toLocaleDateString : item[key].toString());
      }
      s += "\n";
    });
  });
  return s;
}

function flatten(object, addToList, prefix) {
  Object.keys(object).map(key => {
      if (object[key] === null) {
          addToList[prefix + key] = "";
      } else
      if (object[key] instanceof Array) {
          // addToList[prefix + key] = listToFlatString(object[key]);
          for (const i in object[key]) {
              flatten(object[key][i], addToList, prefix + key + "." + i + '.')
          }
      } else if (typeof object[key] == 'object' && !object[key].toLocaleDateString) {
          flatten(object[key], addToList, prefix + key + '.');
      } else {
          addToList[prefix + key] = object[key];
      }
  });
  return addToList;
}

export function transactionToCsv({ transaction, transfers, events }: any) {
  const flattenedData = flatten({
    ...transaction,
    events,
    transfers: transfers.map(({ transfer }: any) => transfer),
  }, {}, '');

  // transfers.forEach(({ transfer }: any, index: number) => {
  //   const flatTransfer = flatten(transfer, flattenedData, `transfer_${index}_`);
  //   Object.assign(flattenedData, flatTransfer);
  // });

  // events.forEach((event: any, index: number) => {
  //   const flatEvent = flatten(event, flattenedData, `event_${index}_`);
  //   Object.assign(flattenedData, flatEvent);
  // });

  const csv = convertArrayToCSV([flattenedData])

  return csv;
}

export function blockToCsv(block: any) {
  const flattenedData = flatten(block, {}, '');


  const csv = convertArrayToCSV([flattenedData])

  return csv;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if ((navigator as any).msSaveBlob) { // IE 10+
    (navigator as any).msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
