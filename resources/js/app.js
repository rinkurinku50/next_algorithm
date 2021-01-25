import axios from "axios";

/// add image

const viewCourses = document.querySelectorAll('.viewcourses');



if (viewCourses != null) {

    viewCourses.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let course = JSON.parse(btn.dataset.course);
            console.log(course);
            document.getElementById('imageId').innerText = `ID: ${course.cId}`;
            document.getElementById('mcimage').src = `/uploads/${course.cimage}`;
        })
    })


}
//


//update course 

const editcourse = document.querySelectorAll('.editcourse');
const sitCourseData = document.querySelector('#sitCourseData');
if (editcourse != null) {

    editcourse.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let course = JSON.parse(btn.dataset.course);
            console.log(course);
            const content = `<div class="card mb-3">
            <div class="card-header">
                <i class="fa fa-table"></i> Update Courses</div>
            <div class="card-body">
                <div class="row">
                    <div class="row justify-content-center">
                        <div class="col-md-10">
                            <form action="/admin/updatecourse/${course.cId}/${course.cimage}" enctype="multipart/form-data" method="POST">
                                <div class="row">

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="name">Course Name</label>
                                            <input class="form-control" value="${course.cname}" name="cname" id="name" type="text" aria-describedby="name" placeholder="Enter Name">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="catagory">Catagory</label>
                                            <input class="form-control" value="${course.ccatagory}" name="ccatagory" id="catagory" type="text" placeholder="Enter Catagory">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="timing">Timing</label>
                                            <input class="form-control" value="${course.ctiming}" name="ctiming" id="timing" type="number" placeholder="Enter Timing">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="cbatch">Batch</label>
                                            <select  id="batch" name="batch" class="form-control">
                                                <option value="morning">Morning</option>
                                                <option value="afternoon">Afternoon</option>
                                                <option value="evening">Evening</option>
                                              </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="description">Description</label>
                                        <textarea class="form-control" required name="cdesc" rows="3" id="description" type="text" placeholder="Enter Description">${course.cdesc}</textarea>
                                    </div>
                                </div>
                                    <div class="col-md-12">

                                        <div class="input-group my-3">
                                            <div class="custom-file">
                                                <input type="file" name="cimage"   class="custom-file-input" accept="image/*" id="upload">
                                                <label class="custom-file-label" id="uploadlabel" for="customFile">${course.cimage}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row justify-content-center">
                                            <div class="col-md-6">
                                                <img style="width: 100%; height: 355px;" src="/uploads/${course.cimage}"  id="imageResult" class="img-fluid" alt="Responsive image">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <hr>
                                <button class="btn btn-primary btn-block" type="submit">Update Course</button>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>

        </div>`;
            sitCourseData.innerHTML = content;
            document.getElementById("batch").value = course.batch;

            const inputF = document.querySelector('#upload');
            inputF.addEventListener('change', (event) => {
                //set image name
                var inputName = event.srcElement;
                if (inputName != null) {
                    var fileName = inputName.files[0].name;
                    console.log(fileName);
                    document.getElementById('uploadlabel').textContent = '' + fileName;

                }
                //for image change
                if (inputF.files && inputF.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        console.log(e);
                        $('#imageResult').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(inputF.files[0]);
                }
            })
        })
    })




}




//




//module show and  Add code
var cvala = document.querySelector('#courseDataA');
var vma = document.querySelector('#viewMA');

if (vma != null) {
    vma.addEventListener('click', (e) => {
        //console.log(cvala.value);
        modulesFindAdd();
    });
}




function modulesFindAdd() {
    var showModule = null;
    axios.get(`/admin/findaddmodules/${cvala.value}`, ).then(
        res => {


            if (JSON.parse(res.data.check) == 1) {
                //console.log(JSON.parse(res.data.modules)['modules']);
                //console.log(res.data);
                console.log(res.data.cId);
                const val = JSON.parse(res.data.modules)['modules']

                var fomData = `
    <div class="col-md-12 ">
    <form action="/admin/addmoduleexist/${res.data.cId}" method="POST">   
     <div class="myModuleField row justify-content-center" >

        </div>
        <div class="row justify-content-center">
         <div class="col-md-10 my-3" style="border-top:1px solid grey"></div>
        <div class="col-md-10 ">
        <h3>Add Module Section</h3>
                                            <div class="row justify-content-center" id="row_field">
                                                <div class="col-md-12 p-3  card shadow">
                                                    <div>
                                                        <button class="btn" disabled="disabled" id="count"></button>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="my-input">Module name</label>
                                                        <input id="my-input" required class="form-control" type="text" name="modulename[]">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="my-textarea">Module Description</label>
                                                        <textarea id="my-textarea" required class="form-control" name="moduledesc[]" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        <div class="col-md-10 mt-3">
                <button type="button" id="addmodules" class="btn btn-success">Add Module</button>
                <button type="submit" id="submit" class="float-right btn btn-primary">Submit</button>

                </div>
        </div>    
     </form>   
    </div>
    `;
                document.querySelector('#formRowA').innerHTML = fomData;


                for (const [key, value] of Object.entries(val)) {
                    //console.log(value.mdesc);
                    showModule = `
                    
                    <div class="col-md-10 mb-2 p-3  card shadow">
                    <div>
                        <button class="btn btn-primary" disabled="disabled" id="count">${key}</button>
                    </div>
                    <div class="form-group">
                        <label for="my-input">Module name</label>
                        <input id="my-input" value="${value.mname}" required class="form-control" type="text" name="modulename[]">
                    </div>
                    <div class="form-group">
                        <label for="my-textarea">Module Description</label>
                        <textarea id="my-textarea"  required class="form-control" name="moduledesc[]" rows="3">${value.mdesc}</textarea>
                    </div>
                    
                </div>
                `;


                    document.querySelector(".myModuleField").innerHTML += showModule;
                }




            } else {
                showModule = `
                <div class="col-md-12 ">
    <form action="/admin/addmodules/${cvala.value}" method="POST">   
     
        <div class="row justify-content-center">
        <div class="col-md-6 mt-5">
        <h2 class="font-weight-bold text-center">Module Not Found...</h2>
    </div>
    <div class="col-md-10 my-3" style="border-top:1px solid grey"></div>
        <div class="col-md-10 mt-3 ">
        <h3>Add Module Section</h3>
                                            <div class="row justify-content-center" id="row_field">
                                                <div class="col-md-12 p-3  card shadow">
                                                    <div>
                                                        <button class="btn" disabled="disabled" id="count"></button>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="my-input">Module name</label>
                                                        <input id="my-input" required class="form-control" type="text" name="modulename[]">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="my-textarea">Module Description</label>
                                                        <textarea id="my-textarea" required class="form-control" name="moduledesc[]" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        <div class="col-md-10 mt-3">
                <button type="button" id="addmodules" class="btn btn-success">Add Module</button>
                <button type="submit" id="submit" class="float-right btn btn-primary">Submit</button>

                </div>
        </div>    
     </form>   
    </div>
                
                
          `;
                document.querySelector("#formRowA").innerHTML = showModule;

            }

            addMoreFields();

        }
    )

}

// end module show and  Add code

//this code for modules fields
function addMoreFields() {
    var moduleContent = '<div class="col-md-12 p-3 my-2  card shadow">   <div><button class="btn" disabled="disabled" id="count"></button></div><div class="form-group"><label for="my-input">Module name</label><input id="my-input" required class="form-control" type="text" name="modulename[]"></div><div class="form-group"><label for="my-textarea">Module Description</label><textarea id="my-textarea" required class="form-control" name="moduledesc[]" rows="3"></textarea></div> <button type="button" name="remove" id="remove" class="btn btn-block  btn-danger">Remove</button> </div>';
    var x = 1;
    $("#addmodules").click(function() {
        $("#row_field").append(moduleContent);
        x++;
    });
    $("#row_field").on('click', '#remove', function() {
        $(this).closest('div').remove();
        x--;
    });

}
//end this code for modules fields










//module show and update code 
var cval = document.querySelector('#courseData');
var vm = document.querySelector('#viewM');


if (vm != null) {
    vm.addEventListener('click', (e) => {
        console.log(cval.value);
        modulesFindUpdate();
    });
}



function modulesFindUpdate() {

    var showModule = null;
    axios.get(`/admin/findmodules/${cval.value}`, ).then(
        res => {


            if (JSON.parse(res.data.check) == 1) {
                //console.log(JSON.parse(res.data.modules)['modules']);
                //console.log(res.data);
                console.log(res.data);
                const val = JSON.parse(res.data.modules)['modules']

                var fomData = `
    <div class="col-md-12 ">
    <form action="/admin/updatemodule/${res.data.cId}" method="POST">   
     <div class="myModuleField row justify-content-center" >

        </div>
        <div class="row justify-content-center">
        <div class="col-md-10 mt-3 ">
        <button type="submit" id="update" class="btn btn-block   btn-warning font-weight-bold">Update</button>
        </div>
        </div>    
     </form>   
    </div>
    `;
                document.querySelector('#formRow').innerHTML = fomData;

                //document.querySelector("#myModuleField").innerHTML = "";

                for (const [key, value] of Object.entries(val)) {
                    //console.log(value.mdesc);
                    showModule = `
                    
                    <div class="col-md-10 mb-2 p-3  card shadow">
                    <div>
                        <button class="btn btn-primary" disabled="disabled" id="count">${key}</button>
                    </div>
                    <div class="form-group">
                        <label for="my-input">Module name</label>
                        <input id="my-input" value="${value.mname}" required class="form-control" type="text" name="modulename[]">
                    </div>
                    <div class="form-group">
                        <label for="my-textarea">Module Description</label>
                        <textarea id="my-textarea"  required class="form-control" name="moduledesc[]" rows="3">${value.mdesc}</textarea>
                    </div>
                    <button type="button" id="deleteModule"  class="btn btn-block text-white  btn-danger font-weight-bold">Delete</button>
                </div>
                `;



                    document.querySelector(".myModuleField").innerHTML += showModule;

                }




            } else {
                showModule = `<div class="col-md-6 mt-5">
                <h2 class="font-weight-bold text-center">Module Not Found...</h2>
                <a href="/admin/addmodules" id="add" class="btn btn-block  btn-success font-weight-bold">Add Modules</a>
            </div>`;
                document.querySelector("#formRow").innerHTML = showModule;

            }


            $(".myModuleField").on('click', '#deleteModule', function() {
                $(this).closest('div').remove();

            });






        }
    )
}

//end module show and update code


//show all module 

var shval = document.querySelector('#courseDataVm');
var shvm = document.querySelector('#viewMI');


if (shvm != null) {
    shvm.addEventListener('click', (e) => {
        console.log(shval.value);
        showAllModule();
    });

    function showAllModule() {
        var showModule = null;
        axios.get(`/admin/modules/${shval.value}`).then(
            res => {

                console.log(res.data);
                if (JSON.parse(res.data.check) == 1) {
                    //console.log(JSON.parse(res.data.modules)['modules']);
                    //console.log(res.data);
                    console.log(res.data);
                    const val = JSON.parse(res.data.modules)['modules']

                    var fomData = `

                    <div class="card mb-3">
                    <div class="card-header">
                        <i class="fa fa-table"></i> Show All Module</div>
                    <div class="card-body">

                    <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Module Number</th>
                                <th>Module Name</th>
                                <th>Module Description</th>
                
                            </tr>
                        </thead>
                
                        <tbody id="tableBody">
                
                
                
                        </tbody>
                    </table>
                </div> 

                    </div>
                    <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>

                </div>



                    
                    `;
                    document.querySelector('#formRowV').innerHTML = fomData;


                    for (const [key, value] of Object.entries(val)) {
                        //console.log(value.mdesc);
                        showModule = `
                        <tr>
                        <td>
                           ${key}
                        </td>
                        <td>
                        ${value.mname}
                        </td>
                        <td>
                        ${value.mdesc}
                        </td>
                        
                        
                    </tr>
                       
                    `;



                        document.querySelector("#tableBody").innerHTML += showModule;

                    }




                } else {
                    showModule = `

                    <div class="card mb-3">
                    <div class="card-header">
                        <i class="fa fa-table"></i> Show All Module</div>
                    <div class="card-body">

                    <div class="row justify-content-center">
                    <div class="col-md-6 mt-5">
                    <h2 class="font-weight-bold text-center">Module Not Found...</h2>
                    <a href="/admin/addmodules" id="add" class="btn btn-block  btn-success font-weight-bold">Add Modules</a>
                </div>
                    </div>

                    </div>
                    <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>

                </div>

                    
                    `;
                    document.querySelector("#formRowV").innerHTML = showModule;

                }









            }
        )

    }

}

//end show all module


//accordion code

$('.acc_ctrl').on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next()
            .stop()
            .slideUp(300);
    } else {
        $(this).addClass('active');
        $(this).next()
            .stop()
            .slideDown(300);
    }
});