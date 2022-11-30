<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeController extends Controller
{
    //
    public function Getdata()
    {
        return "hello";
    }
    public function Addemploye(Request $request)
    {
        $validator = Validator::make($request->all(), 
        [
            'name' => 'required|string',
            'email' => 'required|email',
        ],
        [
            'name.required' => 'The name is required',
            'email.required' => 'The email is required',
        ]);
        if ($validator->fails()) {    
            return response()->json($validator->messages(), 400);
        }
        $data = new Employe();
        $data->name = $request->name;
        $data->email = $request->email;
        $data->status = $request->status == 'null' ? 1 :$request->status;
        $data->save();
        if ($data) {
            return response()->json("Employe Add successfully", 200);
        }
    }

    public function Getemploye(Request $request){
        $search = $request->search;
        $record = $request->record;
        $data = Employe::where(function($q) use ($search) {
            if($search != ''){
                $q->where('name','LIKE',"%".$search."%");
                $q->Orwhere('email','LIKE',"%".$search."%");
            }
        })->orderBy('id', 'DESC')->paginate($record);
        return response()->json(['result'=>$data, 'code'=>200]);
    }
    public function ActiveInactiveEmploye(Request $request){
        $data = Employe::where('id',$request->id)->update(['status'=>$request->status]);
        if($data){
            return response()->json(['message' => 'Employee status change successfully', 'code' => 200]);
        }else{
            return response()->json(['message' => 'Something is wrong', 'code' => 400]);
        }

    }
}
