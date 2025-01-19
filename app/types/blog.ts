export interface BlogPost {
    userId: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
  }
  
  export interface BlogResponse {
    success: boolean;
    data?: BlogPost;
    message: string;
  }