import { userDao } from "../persistence/mongo/dao/user.dao.js"

class UserServices {

     async getAll(){
        return await userDao.getAll();
      }
      async getById ( id){
        return await userDao.getOne(id);
      }
          

      async getOne( query ){
        return await userDao.getOne(query);
      }
    
      async create(data) {
        return await userDao.create(data);
      }
    
      async update(id, data){
        return await userDao.update(id,data)
      }
        
      
      async remove(id){
        return await userDao.remove(id);
      }
}

export const userServices = new UserServices();

