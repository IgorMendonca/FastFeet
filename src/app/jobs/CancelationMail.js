import { resolve } from 'path';

import Mail from '../../lib/Mail';

class CancelationMail {
  get key() {
    return 'CancelationMail';
  }

  async handle({ data }) {
    const { packageProblem, problem } = data;

    await Mail.sendMail({
      to: `<${packageProblem.courier.email}>`,
      subject: 'Cancelation package',
      attachments: [
        {
          filename: 'logo.png',
          path: resolve(__dirname, '..', '..', '..', 'assets', 'logo.png'),
          cid: 'unique@fastfeet.com',
        },
      ],
      template: 'cancelation',
      context: {
        logo: '<img src="cid:unique@fastfeet.com"/>',
        courier: packageProblem.courier.name,
        recipient: packageProblem.recipient.name,
        problem: problem.description,
      },
    });
  }
}

export default new CancelationMail();
