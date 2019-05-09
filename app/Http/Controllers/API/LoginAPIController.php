<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\AppBaseController;
use App\Repositories\UserRepository;
use Response;

class LoginAPIController extends AppBaseController
{
	protected $userRepo;

	public function __construct(UserRepository $userRepo)
	{
		$this->userRepo = $userRepo;
	}

    /**
     * Target: Login to the system including email and password
     * Params: Request
     * @return json 
     */
    public function signIn(Request $request) {
  
    	$credentials = $request->only(['email', 'password']);

        $email = $credentials['email'];

        try {
        	$user = $this->userRepo->findUserByEmail($email);
            dd($user->toArray());
        	if ( !$user ) {
		        return Response::json( [
		        	"success"=> false,
		            "email" => false,
		            "message"=>'Email address not exist in system',
		        ] );
        	}

        	if ( !$token = auth()->attempt($credentials)  ) {
        		return Response::json( [
		        	"success"=> false,
		            "email" => false,
		            "message"=>'Password provider was incorrect',
		        ] );
        	}

        	$this->reNewToken();

        	return Response::json( [
	        	"success"=> true,
	            "data" => auth()->user()
	        ] ); 

        } catch (\Exception $e){

            return ('An unexpected error occurred. Please try again...');
            
        }
    }
    /**
     * Target: Function refresh token for user
     * From: func:signIn
     */
    public function reNewToken()
    {
    	$user = auth()->user();
        $user->access_token = $user->generateAccessToken();
        $user->save();
    }
}
