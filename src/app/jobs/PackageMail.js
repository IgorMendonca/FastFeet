import { resolve } from 'path';

import Mail from '../../lib/Mail';

class PackageMail {
  get key() {
    return 'packageMail';
  }

  async handle({ data }) {
    const { packageData, products } = data;

    await Mail.sendMail({
      to: `<${packageData.courier.email}>`,
      subject: 'New Package',
      attachments: [
        {
          filename: 'logo.png',
          path: resolve(__dirname, '..', '..', '..', 'assets', 'logo.png'),
          cid: 'unique@fastfeet.com',
        },
      ],
      template: 'package',
      context: {
        logo: '<img src="cid:unique@fastfeet.com"/>',
        courier: packageData.courier.name,
        recipient: packageData.recipient.name,
        cidade: packageData.recipient.cidade,
        estado: packageData.recipient.estado,
        cep: packageData.recipient.cep,
        rua: packageData.recipient.rua,
        numero: packageData.recipient.numero,
        complemento: packageData.recipient.complemento,
        product: products,
      },
    });
  }
}

export default new PackageMail();
