export default class ListUserService {
  async run(): Promise<any> {
    // const users = await User.find();

    const users = [
      {
        name: "Joel",
        age: 19,
        job: "Developer",
      },
    ];
    return users;
  }
}
