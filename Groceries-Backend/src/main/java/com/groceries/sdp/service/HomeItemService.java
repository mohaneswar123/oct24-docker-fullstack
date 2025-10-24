package com.groceries.sdp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.groceries.sdp.modal.HomeItem;
import com.groceries.sdp.repo.HomeItemRepo;



@Service
public class HomeItemService {
	
	HomeItemRepo homeItemRepo;
	 
	// ✅ Constructor injection
    public HomeItemService(HomeItemRepo homeItemRepo) {
        this.homeItemRepo = homeItemRepo;
    }

	
	public HomeItem addItem(HomeItem item) {
		return homeItemRepo.save(item);
	}
	public void deleteHomeItem(Long id) {
		if(!homeItemRepo.existsById(id)) {
			throw new RuntimeException("item not found");
		}
		homeItemRepo.deleteById(id);
	}
	public HomeItem updateItem(HomeItem item) {
    HomeItem existingItem = homeItemRepo.findById(item.getId())
        .orElseThrow(() -> new RuntimeException("Item not found"));

    existingItem.setItem(item.getItem());    
    return homeItemRepo.save(existingItem);
	}

	public List<HomeItem> getAll(){
		return homeItemRepo.findAll();
	}
	public HomeItem getItemById(Long id) {
		Optional<HomeItem> Item= homeItemRepo.findById(id);
		return Item.orElse(null);
	}
}

