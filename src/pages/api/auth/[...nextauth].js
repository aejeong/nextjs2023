import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyAPI } from '@/pages/api/openai';

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
   providers: [
    CredentialsProvider({
        id: 'api-login',
        name: "Credentials",
        type: 'credentials',
        credentials: {
          key: ''
        },
        async authorize(credentials){

            const auth = await verifyAPI(credentials.key);

            if(auth.error){
                throw new Error(auth.error.message);
            }

            if(auth){
                return credentials;
            }
            
        }
    })
   ],
   pages:{
    signIn: '/'
   },
   secret: `${process.env.NEXTAUTH_SECRET}`,
   callbacks: {
    async jwt({trigger, session, user, token}){
        if(trigger === 'update' && session){
            token.user = {
                ...session.user
            }
            return token;
        }

        if(user){
            token.user = {
                key: user.key,
                name: 'anonymous',
                roomItems: []
            }
        }
    
        return token;
    },
    async session({ session, token }){
        session.user = {
            ...token.user
        }
        return token;
    }
   }
});