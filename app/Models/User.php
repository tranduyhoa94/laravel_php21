<?php

namespace App\Models;

use Eloquent as Model;
use Lcobucci\JWT\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class User
 * @package App\Models
 * @version May 9, 2019, 1:48 am UTC
 *
 * @property string email
 * @property string first_name
 * @property string last_name
 * @property string password
 * @property string access_token
 */
class User extends Authenticatable
{
    use SoftDeletes;

    public $table = 'users';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'email',
        'first_name',
        'last_name',
        'password',
        'access_token'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'email' => 'string',
        'first_name' => 'string',
        'last_name' => 'string',
        'password' => 'string',
        'access_token' => 'string'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'email' => 'required|email|unique:users',
    ];

    public function generateAccessToken() {

        $token =( string )( new Builder() )->setId( '4f1g23a12aa', true ) 
                        ->setIssuedAt( time() )
                        ->setExpiration( time() + 1209600 ) 
                        ->set( 'username', $this->first_name ) 
                        ->set( 'email', $this->email ) 
                        ->set( 'id', $this->id ) 
                        ->getToken();

        return $token;
    }
}
