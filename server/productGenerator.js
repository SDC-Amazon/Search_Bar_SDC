const fs = require('fs');
const faker = require('faker');

const writer = fs.createWriteStream('products.csv');
writer.write('_id,name,description\n');
writer.on('error', (err) => console.log(err))

const totalRecords = 10e6;

let prevTime = Date.now();
console.time('Product Generation')

for(let i = 1; i <= totalRecords; i++){
  const name = faker.commerce.productName()
  const desc= `${faker.commerce.department()} ${faker.commerce.productName()} ${faker.commerce.productName()}`;
  // don't add newline if last record
  let newline = (i === totalRecords) ? `${i},${name},${desc}`: `${i},${name},${desc}\n`
  writer.write(newline);
  // fun little loading bar console.log
  if((Date.now() - prevTime) >= 2000 || i === totalRecords){
    prevTime = Date.now();
    let loading = '';
    let perc = ((i/totalRecords)*100).toFixed(2);
    let fill = Math.floor(perc/5);
    for(let j = 0; j < fill; j++){ loading +=  '#' }
    while(loading.length < 20){ loading += '-' }
    console.log(`Creating records... [${loading}]  ${new Date().toLocaleTimeString()}  ${perc}%`);
    if(i === totalRecords){
      console.timeEnd('Product Generation');
      writer.end();
      console.log('-----CSV WRITTEN-----');
    }
  }
}