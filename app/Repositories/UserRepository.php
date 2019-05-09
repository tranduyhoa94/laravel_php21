<?php

namespace App\Repositories;

use App\Models\User;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class UserRepository
 * @package App\Repositories
 * @version May 9, 2019, 1:48 am UTC
*/

class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'email',
        'first_name',
        'last_name',
        'password',
        'access_token'
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }

    /**
     * Target : Find user information with email parameters
     * Params : (string) $email
     * @return  collection
     */
    public function findUserByEmail($email) 
    {
        $this->skipPresenter();
        return $this->scopeQuery(function( $query ) use ( $email ) {
            return $query->where( 'email', $email );
        })->first();

    }
}
