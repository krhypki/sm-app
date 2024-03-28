import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

let userData: Prisma.UserCreateInput[] = [
  {
    email: 'adam@adamski.pl',
    password: 'adamadam',
    firstName: 'Adam',
    lastName: 'Adamski',
    posts: {
      create: [
        {
          title: 'Adam First post',
          content: 'This is Adam first post',
        },
        {
          title: 'Adam Second post',
          content: 'This is Adam second post',
        },
      ],
    },
  },
  {
    email: 'bogdan@bogdanowski.pl',
    password: 'bogdanbogdan',
    firstName: 'Bogdan',
    lastName: 'Bogdanowski',
    posts: {
      create: [
        {
          title: 'Bogdan first post',
          content: 'This is Bogdan first post',
        },
        {
          title: 'Bogdan Second post',
          content: 'This is Bogdan second post',
        },
      ],
    },
  },
  {
    email: 'damian@damianowski.pl',
    password: 'damian',
    firstName: 'damian',
    lastName: 'damianowski',
    posts: {
      create: [
        {
          title: 'damian first post',
          content: 'This is damian first post',
        },
        {
          title: 'damian Second post',
          content: 'This is damian second post',
        },
      ],
    },
  },
  {
    email: 'franek@franekowski.pl',
    password: 'franek',
    firstName: 'franek',
    lastName: 'frankowski',
    posts: {
      create: [
        {
          title: 'franek first post',
          content: 'This is franek first post',
        },
        {
          title: 'franek Second post',
          content: 'This is franek second post',
        },
      ],
    },
  },
  {
    email: 'henryk@henrykowski.pl',
    password: 'henryk',
    firstName: 'henryk',
    lastName: 'henrykowski',
    posts: {
      create: [
        {
          title: 'henryk first post',
          content: 'This is henryk first post',
        },
        {
          title: 'henryk Second post',
          content: 'This is henryk second post',
        },
      ],
    },
  },
  {
    email: 'grzegorz@grzegorzowski.pl',
    password: 'grzegorz',
    firstName: 'grzegorz',
    lastName: 'grzegorzowski',
    posts: {
      create: [
        {
          title: 'grzegorz first post',
          content: 'This is grzegorz first post',
        },
        {
          title: 'grzegorz Second post',
          content: 'This is grzegorz second post',
        },
      ],
    },
  },
  {
    email: 'kamil@kamilowski.pl',
    password: 'kamil',
    firstName: 'kamil',
    lastName: 'kamilowski',
    posts: {
      create: [
        {
          title: 'kamil first post',
          content: 'This is kamil first post',
        },
        {
          title: 'kamil Second post',
          content: 'This is kamil second post',
        },
      ],
    },
  },
  {
    email: 'stefan@stefanowski.pl',
    password: 'stefan',
    firstName: 'stefan',
    lastName: 'stefanowski',
    posts: {
      create: [
        {
          title: 'stefan first post',
          content: 'This is stefan first post',
        },
        {
          title: 'stefan Second post',
          content: 'This is stefan second post',
        },
      ],
    },
  },
  {
    email: 'maciej@maciejowski.pl',
    password: 'maciej',
    firstName: 'maciej',
    lastName: 'maciejowski',
    posts: {
      create: [
        {
          title: 'maciej first post',
          content: 'This is maciej first post',
        },
        {
          title: 'maciej Second post',
          content: 'This is maciej second post',
        },
      ],
    },
  },
  {
    email: 'norbert@norbertowski.pl',
    password: 'norbert',
    firstName: 'norbert',
    lastName: 'norbertowski',
    posts: {
      create: [
        {
          title: 'norbert first post',
          content: 'This is norbert first post',
        },
        {
          title: 'norbert Second post',
          content: 'This is norbert second post',
        },
      ],
    },
  },
  {
    email: 'karol@karolowski.pl',
    password: 'karol',
    firstName: 'karol',
    lastName: 'karolowski',
    posts: {
      create: [
        {
          title: 'karol first post',
          content: 'This is karol first post',
        },
        {
          title: 'karol Second post',
          content: 'This is karol second post',
        },
      ],
    },
  },
  {
    email: 'piotr@piotrowski.pl',
    password: 'piotr',
    firstName: 'piotr',
    lastName: 'piotrowski',
    posts: {
      create: [
        {
          title: 'piotr first post',
          content: 'This is piotr first post',
        },
        {
          title: 'piotr Second post',
          content: 'This is piotr second post',
        },
      ],
    },
  },
  {
    email: 'aleksander@pawełowski.pl',
    password: 'paweł',
    firstName: 'paweł',
    lastName: 'pawełowski',
    posts: {
      create: [
        {
          title: 'paweł first post',
          content: 'This is paweł first post',
        },
        {
          title: 'paweł Second post',
          content: 'This is paweł second post',
        },
      ],
    },
  },
  {
    email: 'aleksander@aleksanderowski.pl',
    password: 'aleksander',
    firstName: 'aleksander',
    lastName: 'aleksanderowski',
    posts: {
      create: [
        {
          title: 'aleksander first post',
          content: 'This is aleksander first post',
        },
        {
          title: 'aleksander Second post',
          content: 'This is aleksander second post',
        },
      ],
    },
  },
  {
    email: 'jan@janowski.pl',
    password: 'jan',
    firstName: 'jan',
    lastName: 'janowski',
    posts: {
      create: [
        {
          title: 'jan first post',
          content: 'This is jan first post',
        },
        {
          title: 'jan Second post',
          content: 'This is jan second post',
        },
      ],
    },
  },
  {
    email: 'janusz@januszowski.pl',
    password: 'janusz',
    firstName: 'janusz',
    lastName: 'januszowski',
    posts: {
      create: [
        {
          title: 'janusz first post',
          content: 'This is janusz first post',
        },
        {
          title: 'janusz Second post',
          content: 'This is janusz second post',
        },
      ],
    },
  },
  {
    email: 'filip@filipowski.pl',
    password: 'filip',
    firstName: 'filip',
    lastName: 'filipowski',
    posts: {
      create: [
        {
          title: 'filip first post',
          content: 'This is filip first post',
        },
        {
          title: 'filip Second post',
          content: 'This is filip second post',
        },
      ],
    },
  },
  {
    email: 'zbigniew@zbigniewowski.pl',
    password: 'zbigniew',
    firstName: 'zbigniew',
    lastName: 'zbigniewowski',
    posts: {
      create: [
        {
          title: 'zbigniew first post',
          content: 'This is zbigniew first post',
        },
        {
          title: 'zbigniew Second post',
          content: 'This is zbigniew second post',
        },
      ],
    },
  },
  {
    email: 'andrzej@andrzejowski.pl',
    password: 'andrzej',
    firstName: 'andrzej',
    lastName: 'andrzejowski',
    posts: {
      create: [
        {
          title: 'andrzej first post',
          content: 'This is andrzej first post',
        },
        {
          title: 'andrzej Second post',
          content: 'This is andrzej second post',
        },
      ],
    },
  },
  {
    email: 'roman@romanowski.pl',
    password: 'roman',
    firstName: 'roman',
    lastName: 'romanowski',
    posts: {
      create: [
        {
          title: 'roman first post',
          content: 'This is roman first post',
        },
        {
          title: 'roman Second post',
          content: 'This is roman second post',
        },
      ],
    },
  },

  {
    email: 'bartek@bartekowski.pl',
    password: 'bartek',
    firstName: 'bartek',
    lastName: 'bartekowski',
    posts: {
      create: [
        {
          title: 'bartek first post',
          content: 'This is bartek first post',
        },
        {
          title: 'bartek Second post',
          content: 'This is bartek second post',
        },
      ],
    },
  },
  {
    email: 'jakub@jakubowski.pl',
    password: 'jakub',
    firstName: 'jakub',
    lastName: 'jakubowski',
    posts: {
      create: [
        {
          title: 'jakub first post',
          content: 'This is jakub first post',
        },
        {
          title: 'jakub Second post',
          content: 'This is jakub second post',
        },
      ],
    },
  },
];

async function main() {
  await Promise.all(
    userData.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      await prisma.user.create({
        data: user,
      });
    }),
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
