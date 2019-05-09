<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Lcobucci\JWT\Parser;
use Illuminate\Support\Carbon;
use Lcobucci\JWT\ValidationData;
use Closure;
use App\Repositories\UserRepository;

class MultipleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        try {

            $jwtToken = \Request::header('Authorization');

            if ( !$jwtToken ) {
                return \Response::json( [ 
                    'success' => false,
                    'status'  => 401,
                    'message' => 'Unauthorized ! Header empty !',
                    'data'    => null
                ] );
            }

            $token = ( new Parser() )->parse( (string) $jwtToken );

            $email = $token->getClaim( 'email' );

            $userRepository = new UserRepository( app() );

            $user = $userRepository->findByField( 'email', $email )->first();

            if ( !$user ) {
                return \Response::json( [
                    'success' => false,
                    'status'  => 401,
                    'message' => 'Unauthorized ! Email not found !',
                    'data'    => null
                ] );
            }

            $expDay = date( 'Y:m:d H:i:s', $token->getClaim( 'exp' ) );

            $toDay = Carbon::now()->format( 'Y:m:d H:i:s' );

            if ( $expDay < $toDay ) {
                return \Response::json( [
                    'success' => false,
                    'status' => 408,
                    'message' => 'Pass expired access token ! Please login again !',
                    'data' => null
                ] );
            }

            return $next($request);
        
        } catch (Exception $e) {
            return \Response::json( [
                'success' => false,
                'status' => 500,
                'message' => 'Authorization not correct !',
                'data' => null
            ] );

        }
    }
}
