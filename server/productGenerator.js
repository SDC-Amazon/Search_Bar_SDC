const fs = require('fs');
const faker = require('faker');

const generateRecords = (postgres, mongo) => {  
  const totalRecords = 10e4;
  const data = [];
  if(postgres){
    const writer = fs.createWriteStream('products.csv');
    writer.write('_id,name,description\n');
    writer.on('error', (err) => console.log(err))
  }
  let prevTime = Date.now();
  console.time('Product Generation')

  for(let i = 1; i <= totalRecords; i++){
    const name = faker.commerce.productName()
    const desc= `${faker.commerce.department()} ${faker.commerce.productName()} ${faker.commerce.productName()}`;
    if(postgres){
      // don't add newline if last record
      let newline = (i === totalRecords) ? `${i},${name},${desc}`: `${i},${name},${desc}\n`
      writer.write(newline);
    }else{
      let entry = {
        _id: i,
        name: name,
        description: desc
      };
      data.push(entry);
    }
    // fun little loading bar console.log
    if((Date.now() - prevTime) >= 2000 || i === totalRecords){
      prevTime = Date.now();
      let loading = '';
      let perc = ((i/totalRecords)*100).toFixed(2);
      let fill = Math.floor(perc/5);
      for(let j = 0; j < fill; j++){ loading +=  '#' }
      while(loading.length < 20){ loading += '-' }
      console.log(`Creating records... [${loading}]  ${new Date().toLocaleTimeString()}  ${perc}%`);
    }
  }
  console.timeEnd('Product Generation');
  if(postgres){ 
    writer.end(); 
    console.log('-----CSV WRITTEN-----');
  }else{
    return data;
  }
  
}

module.exports.generateRecords = generateRecords