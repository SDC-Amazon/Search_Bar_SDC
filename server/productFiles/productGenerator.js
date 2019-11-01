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
  csvWriter.writeRecords(data)
  .then(()=> console.log('----CSV WRITTEN----'))
  .catch((err)=> console.log(err));
}

const data =[];

const million = () => {
  for(let i = 1; i <= 10000000; i++){
    let product = {
      id: i,
      name: faker.commerce.productName(),
      description: faker.lorem.sentences(3),
    }
    data.push(product);
    if(i === 10000000){
      writeEm();
    }else if(i % 100000 === 0){
      console.log(`${i} records created...`)
    }
  }
}
million();


// Write 10 files and then export ONE file from the table later
