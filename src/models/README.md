# Models
All Data Types related to application

example: 

```
export namespace AuthTypes {
  export interface ReqIntrospect {
    ClientId: string;
    CookiesDomain: string;
    CookiesPrefix: string;
  }

  export interface ResIntrospect {
    isSuccess: boolean;
    data: {
      access_token: string;
      status: string;
      scope: string;
      user_info: string;
      local_role: string;
    };
    description: string;
  }
}

```
