import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loding from '../Shared/Loding';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, UbdateError] = useUpdateProfile(auth);

      const navigate = useNavigate();


      let signInError;

     if(loading || gLoading || updating){
       return <Loding></Loding>
     }  
 
     if(error || gError || UbdateError){
        signInError=<small className='text-red-500'>{error?.message || gError?.message || UbdateError?.message }</small>
     }

    if (user || gUser){
        console.log(user  || gUser);
    }
   
    const onSubmit = async data =>{
        console.log(data)
       await createUserWithEmailAndPassword(data.email, data.password);
       await updateProfile({ displayName:data.name });
       console.log('ubdate done');
       navigate('/appointment');
    };
    return (
        <div className=' flex justify-center items-center h-screen'>
            <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
          <h2 class=" text-center text-2xl font-bold">Sign Up</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>

         {/* name */}

          <div class="form-control w-full max-w-xs">
           <label class="label">
              <span class="label-text">Name</span>
              
            </label>
            <input 
            type="text"
            placeholder=" Your Name"
            class="input input-bordered w-full max-w-xs"
            {...register("name", {
               
                required: {
                  value: true,
                  message: 'Name is Required' 
                },
              
              })}

              />
              <label class="label">
              {errors.name?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.name.message}</span>}
              
           </label>
          </div>

          {/* email */}

          <div class="form-control w-full max-w-xs">
           <label class="label">
              <span class="label-text">Email</span>
              
            </label>
            <input 
            type="email"
            placeholder="Enter your email"
            class="input input-bordered w-full max-w-xs"
            {...register("email", {
               
                required: {
                  value: true,
                  message: 'Email is Required' 
                },
                pattern: {
                  value:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  message: 'Provide a valid Email' 
                }
              })}

              />
              <label class="label">
              {errors.email?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.email.message}</span>}
              {errors.email?.type === 'pattern' &&  <span class="label-text-alt text-red-500">{errors.email.message}</span>}
           </label>
          </div>

          {/* pass */}

          <div class="form-control w-full max-w-xs">
           <label class="label">
              <span class="label-text">Password</span>
              
            </label>
            <input 
            type="password"
            placeholder="Enter your password"
            class="input input-bordered w-full max-w-xs"
            {...register("password", {
               
                required: {
                  value: true,
                  message: 'password is Required' 
                },
                minLength: {
                  value:6,
                  message: 'Must bd 6 charecters or longer' 
                }
              })}

              />
              <label class="label">
              {errors.password?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.password.message}</span>}
              {errors.password?.type === 'minLength' &&  <span class="label-text-alt text-red-500">{errors.password.message}</span>}
           </label>
          </div>
         
         {signInError}
        
      <input  class="btn w-full max-w-xs text-white"  type="submit" value='Sign Up ' />
      
      </form>

       <p> <small>Already Have An Account?  <Link className='text-primary' to='/login'> Please Login</Link> </small> </p>
          
          <div class="divider">OR</div>
          <button onClick={() => signInWithGoogle()} class="btn btn-outline">Continue with Google</button>
        
           </div>
          </div>
        </div>
    );
};

export default SignUp;