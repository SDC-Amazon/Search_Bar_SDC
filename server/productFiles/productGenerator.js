const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Heap was very mad, so this ran 10x (0-9) manually

const csvWriter = createCsvWriter({
  path: `./server/productFiles/productsTest.csv`,
  header: [
    {id: 'id', title: 'id'},
    {id: 'name', title: 'name'},
    {id: 'description', title: 'description'}
  ]
});
const writeEm = () => {
  console.log('Writing file...')
  csvWriter.writeRecords(data)
    .then(()=> console.log('----CSV WRITTEN----'))
    .catch((err)=> console.log(err));
}

const data =[];
const totalRecords = 10000000;

const million = () => {
  for(let i = 1; i <= totalRecords; i++){
    let product = {
      id: i,
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(3),
    }
    data.push(product);
    if(i % 500000 === 0){
      let loading = '';
      let fill = (i / 100000) / 5;
      for(let j = 0; j < fill; j++){ loading +=  '#' }
      while(loading.length < 20){ loading += '-' }
      console.log(`Creating records... [${loading}]  ${fill*5}%`)
      if(i === 10000000){
        writeEm();
      }
    }
  }
}
million();
