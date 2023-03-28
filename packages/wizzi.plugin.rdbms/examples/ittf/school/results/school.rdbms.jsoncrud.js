/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.rdbms\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.rdbms\lib\artifacts\rdbms\jsoncrud\gen\ittf\jsoncrud.js.ittf
*/
'use strict';
var u = {
    isString: function(item) {
        return ;
    }, 
    isObject: function(item) {
        return ;
    }
 };
//
var school = function(persister) {
    this.persister = persister;
};
schoolTable.prototype.getList = function(school_keys) {
    return this.persister.getList(school_keys);
}
;
schoolTable.prototype.findOne = function(search_obj) {
    return this.persister.findOne('school', search_obj));
}
;
schoolTable.prototype.find = function(search_obj) {
    return this.persister.find('school', search_obj));
}
;
schoolTable.prototype.insert = function(school_obj) {
    var extant = this.findOne({
        name: school_obj.name
     });
    if (extant) {
        console.log('school already in DB: ');
        console.log(school_obj.name)
        return extant._id;
    }
    else {
        console.log('inserting school object:');
        console.log(school_obj.name);
        this.persister.writeJson(school_obj);
        var oschool = this.findOne({
            name: school_obj.name
         });
        return oschool._id;
    }
}
;
schoolTable.prototype.update = function(school_obj) {
    var extant = this.findOne({
        name: school_obj.name
     });
    if (!extant) {
        console.log('school not in DB: ');
        console.log(school_obj.name);
        return false;
    }
    else {
        console.log('updating school object:');
        console.log(school_obj.name);
        this.persister.updateItem(school_obj);
        return true;
    }
}
;
schoolTable.prototype.delete = function(key_or_obj) {
    if (util.isString(key_or_obj)) {
        key_or_obj = {
            key: key_or_obj
         };
    }
    var extant = this.findOne(key_or_obj);
    if (!extant) {
        console.log('school not in DB: ');
        return false;
    }
    else {
        console.log('deleting school object:');
        console.log(key_or_obj.name);
        this.persister.deleteItem('school', key_or_obj)
        return true;
    }
}
;
//
var teacher = function(persister) {
    this.persister = persister;
};
teacherTable.prototype.getList = function(teacher_keys) {
    return this.persister.getList(teacher_keys);
}
;
teacherTable.prototype.findOne = function(search_obj) {
    return this.persister.findOne('teacher', search_obj));
}
;
teacherTable.prototype.find = function(search_obj) {
    return this.persister.find('teacher', search_obj));
}
;
teacherTable.prototype.insert = function(teacher_obj) {
    var extant = this.findOne({
        name: teacher_obj.name
     });
    if (extant) {
        console.log('teacher already in DB: ');
        console.log(teacher_obj.name)
        return extant._id;
    }
    else {
        console.log('inserting teacher object:');
        console.log(teacher_obj.name);
        this.persister.writeJson(teacher_obj);
        var oteacher = this.findOne({
            name: teacher_obj.name
         });
        return oteacher._id;
    }
}
;
teacherTable.prototype.update = function(teacher_obj) {
    var extant = this.findOne({
        name: teacher_obj.name
     });
    if (!extant) {
        console.log('teacher not in DB: ');
        console.log(teacher_obj.name);
        return false;
    }
    else {
        console.log('updating teacher object:');
        console.log(teacher_obj.name);
        this.persister.updateItem(teacher_obj);
        return true;
    }
}
;
teacherTable.prototype.delete = function(key_or_obj) {
    if (util.isString(key_or_obj)) {
        key_or_obj = {
            key: key_or_obj
         };
    }
    var extant = this.findOne(key_or_obj);
    if (!extant) {
        console.log('teacher not in DB: ');
        return false;
    }
    else {
        console.log('deleting teacher object:');
        console.log(key_or_obj.name);
        this.persister.deleteItem('teacher', key_or_obj)
        return true;
    }
}
;
//
var student = function(persister) {
    this.persister = persister;
};
studentTable.prototype.getList = function(student_keys) {
    return this.persister.getList(student_keys);
}
;
studentTable.prototype.findOne = function(search_obj) {
    return this.persister.findOne('student', search_obj));
}
;
studentTable.prototype.find = function(search_obj) {
    return this.persister.find('student', search_obj));
}
;
studentTable.prototype.insert = function(student_obj) {
    var extant = this.findOne({
        name: student_obj.name
     });
    if (extant) {
        console.log('student already in DB: ');
        console.log(student_obj.name)
        return extant._id;
    }
    else {
        console.log('inserting student object:');
        console.log(student_obj.name);
        this.persister.writeJson(student_obj);
        var ostudent = this.findOne({
            name: student_obj.name
         });
        return ostudent._id;
    }
}
;
studentTable.prototype.update = function(student_obj) {
    var extant = this.findOne({
        name: student_obj.name
     });
    if (!extant) {
        console.log('student not in DB: ');
        console.log(student_obj.name);
        return false;
    }
    else {
        console.log('updating student object:');
        console.log(student_obj.name);
        this.persister.updateItem(student_obj);
        return true;
    }
}
;
studentTable.prototype.delete = function(key_or_obj) {
    if (util.isString(key_or_obj)) {
        key_or_obj = {
            key: key_or_obj
         };
    }
    var extant = this.findOne(key_or_obj);
    if (!extant) {
        console.log('student not in DB: ');
        return false;
    }
    else {
        console.log('deleting student object:');
        console.log(key_or_obj.name);
        this.persister.deleteItem('student', key_or_obj)
        return true;
    }
}
;
//
var course = function(persister) {
    this.persister = persister;
};
courseTable.prototype.getList = function(course_keys) {
    return this.persister.getList(course_keys);
}
;
courseTable.prototype.findOne = function(search_obj) {
    return this.persister.findOne('course', search_obj));
}
;
courseTable.prototype.find = function(search_obj) {
    return this.persister.find('course', search_obj));
}
;
courseTable.prototype.insert = function(course_obj) {
    var extant = this.findOne({
        name: course_obj.name
     });
    if (extant) {
        console.log('course already in DB: ');
        console.log(course_obj.name)
        return extant._id;
    }
    else {
        console.log('inserting course object:');
        console.log(course_obj.name);
        this.persister.writeJson(course_obj);
        var ocourse = this.findOne({
            name: course_obj.name
         });
        return ocourse._id;
    }
}
;
courseTable.prototype.update = function(course_obj) {
    var extant = this.findOne({
        name: course_obj.name
     });
    if (!extant) {
        console.log('course not in DB: ');
        console.log(course_obj.name);
        return false;
    }
    else {
        console.log('updating course object:');
        console.log(course_obj.name);
        this.persister.updateItem(course_obj);
        return true;
    }
}
;
courseTable.prototype.delete = function(key_or_obj) {
    if (util.isString(key_or_obj)) {
        key_or_obj = {
            key: key_or_obj
         };
    }
    var extant = this.findOne(key_or_obj);
    if (!extant) {
        console.log('course not in DB: ');
        return false;
    }
    else {
        console.log('deleting course object:');
        console.log(key_or_obj.name);
        this.persister.deleteItem('course', key_or_obj)
        return true;
    }
}
;
module.exports = {
    "school": school, 
    "teacher": teacher, 
    "student": student, 
    "course": course
 };

