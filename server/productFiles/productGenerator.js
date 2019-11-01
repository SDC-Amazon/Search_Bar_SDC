const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Heap was very mad, so this ran 10x (0-9) manually
const writeEm = (data, pathName) => {
  console.log('Writing file...')
  let csvWriter = createCsvWriter({
    path: `./server/productFiles/${pathName}.csv`,
    header: [
      {id: 'id', title: 'id'},
      {id: 'name', title: 'name'},
      {id: 'description', title: 'description'}
    ]
  });
  csvWriter.writeRecords(data)
    .then(()=> {
      console.log(`----CSV ${pathName} WRITTEN----`)
    })
    .catch((err)=> console.log(err));
}

const data1 =[];
const data2 =[];
const totalRecords = 10000000;

// let amt = 0;

// let calcPercent = () => {
//   console.log('in interval');
//   let percent = ((amt / totalRecords) * 100).toFixed(1);
//   let loading = '';
//   let fill = Math.floor(percent / 5);
//   for(let j = 0; j < fill; j++){ loading +=  '#' }
//   while(loading.length < 20){ loading += '-' }
//   console.log(`Creating records... [${loading}]  ${percent}%`)
//   if(amt === totalRecords){
//     console.timeEnd('generation');
//     console.time('writing');
//     writeEm();
//   }else{
//     console.log('setting timeout')
//     setTimeout(calcPercent, 2500);
//   }
// }

// const interval = setInterval(calcPercent, 2500);

console.time('generation')
for(let i = 1; i <= totalRecords; i++){
  let product = {
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(3),
  }
  if(i <= totalRecords/2){
    data1.push(product)
  }else{
    data2.push(product);
  } 
  // amt++;
  if(i % 500000 === 0){
    let loading = '';
    let fill = (i / 100000) / 5;
    for(let j = 0; j < fill; j++){ loading +=  '#' }
    while(loading.length < 20){ loading += '-' }
    console.log(`Creating records... [${loading}]  ${fill * 5}%`);
    if(i === 10000000){
      console.timeEnd('generation');
      console.time('writing');
      // clearInterval(interval);
      writeEm(data1, 'firstHalf');
      writeEm(data2, 'secondHalf');
    }
  }
}
