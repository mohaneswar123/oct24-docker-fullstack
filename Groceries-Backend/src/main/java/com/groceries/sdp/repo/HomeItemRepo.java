package com.groceries.sdp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groceries.sdp.modal.HomeItem;


@Repository
public interface HomeItemRepo extends JpaRepository<HomeItem, Long>{

	HomeItem findHomeTasksById(Long id);


}

