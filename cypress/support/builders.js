import { build, fake } from "@jackfranklin/test-data-bot";

export const authBuilder = build("Auth", {
  fields: {
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
    name: fake(f => f.name.firstName()),
  },
});

export const userBuilder = build("User", {
  fields: {
    name: fake(f => f.name.firstName()),
    email: fake(f => f.internet.email()),
    _id: fake(f => f.random.uuid()),
  },
});

export const postBuilder = build("Post", {
  fields: {
    _id: fake(f => f.random.uuid()),
    title: fake(f => f.lorem.sentence()),
    content: fake(f => f.lorem.paragraphs()),
    image: fake(f => f.random.image()),
    date: fake(f => f.date.recent()),
    createdBy: userBuilder(),
  },
});
