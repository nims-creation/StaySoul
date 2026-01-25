package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.HotelDto;
import com.nimscreation.projects.StaySoul.entity.Hotel;
import com.nimscreation.projects.StaySoul.exception.ResourceNotFoundException;
import com.nimscreation.projects.StaySoul.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService{

    private final HotelRepository hotelRepository;
    private final ModelMapper modelMapper;



    @Override
    public HotelDto createNewHotel(HotelDto hotelDto) {
        log.info("Creating a new hotel with their name: {}",hotelDto.getName());
        Hotel hotel = modelMapper.map(hotelDto, Hotel.class);
        hotel.setActive(false);
        hotel = hotelRepository.save(hotel);
        log.info("Created a new hotel with ID : {}",hotelDto.getId());
        return modelMapper.map(hotel, HotelDto.class);
    }

    @Override
    public HotelDto getHotelById(Long id) {
        log.info("Getting the hotel with ID: {}",id);
        Hotel hotel = hotelRepository
                .findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Hotel not found wit ID: {}"+id));
        return modelMapper.map(hotel, HotelDto.class);
    }

    @Override
    public HotelDto updateHotelById(long id, HotelDto hotelDto) {
        log.info("Updating the hotel with ID: {}",id);
        Hotel hotel = hotelRepository
                .findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Hotel not found with ID: {}"+id));
        modelMapper.map(hotelDto, hotel);
        hotel.setId(id);
        hotel = hotelRepository.save(hotel);
        return modelMapper.map(hotel, HotelDto.class);
    }

    @Override
    public void deleteHotelById(long hotelId) {
        boolean exists = hotelRepository.existsById(hotelId);
        if(!exists) throw new ResourceNotFoundException("Hotel not found with ID: {}"+hotelId);

        hotelRepository.deleteById(hotelId);


    }


}
