import crypto from 'crypto';

const teste = 'igor123';

async function random() {
  await crypto.randomBytes(16, (err, res) => {
    if (err) throw err;

    console.log(res.toString('hex'));
    return res.toString('hex');
  });
}

function randomBytesAsync() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.toString('hex'));
    });
  });
}

randomBytesAsync().then((radonValue) => {});

const teste2 = crypto.randomBytes(16, (err, res) => {
  if (err) throw err;

  return res.toString('hex');
});

async function ler(cb) {
  console.log(await cb());
}

random();
