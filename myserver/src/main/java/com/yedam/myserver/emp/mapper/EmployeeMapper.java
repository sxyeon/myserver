package com.yedam.myserver.emp.mapper;

import java.util.List;
import java.util.Map;

import com.yedam.myserver.emp.vo.Departments;
import com.yedam.myserver.emp.vo.Employee;
import com.yedam.myserver.emp.vo.Jobs;

public interface EmployeeMapper {

	List<Employee> findEmployees();		//사원검색
	int persist(Employee emp);			//사원등록
	int merge(Employee emp);			//사원수정
	int remove(Employee emp);			//사원삭제
	
	List<Jobs> findJobs();				//job검색
	List<Departments> findDepartments();//부서검색
	
	Map changeJobDept(Map map); // 사원정보변경 프로시저 호출
	Map getDeptList(Map map); // 부서번호(80) -> Sales 부서 사원 커서타입으로 리턴
}
