# Noblox v5 idea
As I see it, there are a few ways we could go about it.
If we want to maintain backwards compatibility:
There are two options. This repository is an implementation of option 2.

### Option 1
- Have methods or aliases to current methods on the Client class
- These methods perform the actual http fetching. The Client class exposes other classes but they're just wrappers for these
- When a new class is created, it is passed the data returned from the Client method

### Pros
- Simple
- Similar to the current system
- Objects are very optional, rather than utility methods (i.e. noblox.getPlayerInfo) being a wrapper around classes


### Cons
- May be difficult to maintain: Constantly having to reference back to the client when adding new features
- The client file will likely have to be large
- Lots of logic that isn't nessessarily related in one class/file


### Option 2
- Have methods or aliases to current methods on the Client class
- These methods do not perform http work: They work with the OOP classes
    - i.e. getPlayerInfo would run `getUser`, then return the `User` in the playerInfo format
    
- Classes are responsible for fetching - for example via. a method like `Class.get`



### Pros
- More Object oriented
- Allows data to be updated when an end user has an instance of that class, i.e.
```js
const user = noblox.getUser();
// time passes
// update user's info
const info = user.fetch();

```
### Cons
- may be harder to implement caching
    - This could be overcome by using caching with the http method, or
    - Using classes **as** the cache. probably a better option. i.e.
        - Could make Client.getUser either just return a `User`, or first run `User.get` then return it
- Spreads out http usage (may actually be a good thing - splitting code into appropriate files)
- May be more difficult to understand for new maintainers/users
- When an instance is first created, there is no data associated with it
    - This perhaps isn't great for typing. Would it be better to pass the complete  data in (option 1)
    - Could be solved by running fetch within the constructor, but Promises within constructors are a no-no.




## The issue of backwards compatibility
I would also wonder if it's really worth supporting backwards compatibility.

After all, the point of a Semver major (v5) update is that it breaks current features.

I think it's worth having simple methods on the main Client but whether all http fetching is contained there is a bigger
question - Having it all on the Client would result in a *massive* client class.

The idea of having all http fetching on the Client class comes from the `Eris` discord library, but that library is
different in that it mainly deals with an API that sends Instances via. websocket, instead of retrieving them - and they
have a consistent API to work with, so in most places a lot of the http code can be reduced with boilerplate.
We do not have that luxury, and across different endpoints the response shape changes a lot.
