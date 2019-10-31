const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let j = 9;

const data = [];

for(let i = j*1000000; i < j*1000000+1000000; i++){
  let product = {
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(3),
  }
  data.push(product);
}

const csvWriter = createCsvWriter({
  path: `./server/productFiles/products${j+1}.csv`,
  header: [
    {id: 'id', title: 'id'},
    {id: 'name', title: 'name'},
    {id: 'description', title: 'description'}
  ]
});

csvWriter.writeRecords(data)
  .then(()=> console.log('----CSV WRITTEN----'))
  .catch((err)=> console.log(err));