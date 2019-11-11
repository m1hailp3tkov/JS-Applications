function solve()
{
    class Post
    {
        constructor(title, content)
        {
            this.title = title;
            this.content = content;
        }

        toString()
        {
            return `Post: ${this.title}\nContent: ${this.content}\n`;
        }
    }

    class SocialMediaPost extends Post
    {
        constructor(title, content, likes, dislikes)
        {
            super(title,content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment)
        {
            this.comments.push(comment);
        }

        toString()
        {
            return `${super.toString()}Rating: ${this.likes - this.dislikes}
${this.comments.length > 0 ? (`Comments:\n` + this.comments.map(comment => ` * ${comment}`).join('\n') + '\n') : ('')}`.trim();
        }
    }

    class BlogPost extends Post
    {
        constructor(title, content, views)
        {
            super(title,content);
            this.views = views;
        }

        view()
        {
            this.views++;
            return this;
        }

        toString()
        {
            return super.toString() + `Views: ${this.views}\n`.trim();
        }
    }

    // let a = new SocialMediaPost('asd', 'asd', 10, 5);
    // a.addComment('asd');
    // console.log(a.toString());

    return {Post, BlogPost, SocialMediaPost};
}